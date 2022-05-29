import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CacheManagerMockProvider } from '../../test/mocks/cache-manager.mock';
import { ShortUrlService } from './short-url.service';

describe('ShortUrlService', () => {
  let service: ShortUrlService;
  let cache: Cache;
  const testUrl = 'https://www.finn.auto/en-US';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheManagerMockProvider, ShortUrlService],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
    cache = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should store the original url into the cache', async () => {
      const spy = jest.spyOn(cache, 'set');

      const shortUrl = await service.create({
        original: testUrl,
      });
      expect(spy).toHaveBeenCalled();
      expect(shortUrl.original).toEqual(testUrl);
      expect(shortUrl.short.length).toBeGreaterThan(0);
    });

    it('should create unique short urls for every call', async () => {
      const shortUrl = await service.create({
        original: testUrl,
      });

      const shortUrl2 = await service.create({ original: testUrl });
      expect(shortUrl.short).not.toEqual(shortUrl2.short);
    });

    it('allows providing a set short code as part of the DTO', async () => {
      const shortUrl = await service.create({
        original: testUrl,
        short: 'abcd',
      });

      expect(shortUrl.original).toEqual(testUrl);
      expect(shortUrl.short).toEqual('abcd');
    });
  });

  describe('findByKey', () => {
    it('should return a ShortUrl object if given an existing key', async () => {
      const spy = jest.spyOn(cache, 'get').mockResolvedValue(testUrl);

      const retrieved = await service.findByKey('mockKey');

      expect(spy).toHaveBeenCalled();
      expect(retrieved.short).toEqual('mockKey');
      expect(retrieved.original).toEqual(testUrl);
    });

    it('should return null when not given a valid short code', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(undefined);

      const retrieved = await service.findByKey('mockKey');

      expect(retrieved).toBeNull();
    });
  });

  describe('reset', () => {
    it('should reset the cache through the cache manager', async () => {
      const spy = jest.spyOn(cache, 'reset');

      await service.reset();

      expect(spy).toHaveBeenCalled();
    });
  });
});
