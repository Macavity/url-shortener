import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CacheManagerMockProvider } from '../../test/mocks/cache-manager.mock';
import { ShortUrlService } from './short-url.service';

describe('ShortUrlService', () => {
  let service: ShortUrlService;
  let cache: Cache;

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

      await service.create({ original: 'https://www.finn.auto/en-US' });
      expect(spy).toHaveBeenCalled();
    });
  });
});
