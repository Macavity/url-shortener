import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheManagerMockProvider } from '../../test/mocks/cache-manager.mock';
import { ShortUrl } from './entities/short-url.entity';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';

describe('ShortUrlController', () => {
  let controller: ShortUrlController;
  let service: ShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlController],
      providers: [CacheManagerMockProvider, ShortUrlService],
    }).compile();

    controller = module.get<ShortUrlController>(ShortUrlController);
    service = module.get<ShortUrlService>(ShortUrlService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Short URL', () => {
    it('calls the service to create a new entry', async () => {
      const createSpy = jest.spyOn(service, 'create');
      jest.spyOn(service, 'findByKey').mockResolvedValue(null);
      await controller.create({ original: 'https://google.de' });

      expect(createSpy).toHaveBeenCalled();
    });

    it('fails when provided with an invalid URL', async () => {
      jest.spyOn(service, 'create');
      jest.spyOn(service, 'findByKey').mockResolvedValue(null);

      await expect(async () => {
        await controller.create({ original: 'Horst Müller' });
      }).rejects.toThrow(UnprocessableEntityException);
    });

    it('allows setting the short code in the request DTO', async () => {
      const createSpy = jest.spyOn(service, 'create');
      jest.spyOn(service, 'findByKey').mockResolvedValue(null);
      await controller.create({
        original: 'https://google.de',
        short: 'abcd',
      });

      expect(createSpy).toHaveBeenCalled();
    });

    it('fails with Bad Request when called with an existing key', async () => {
      jest.spyOn(service, 'create');
      const mockExistingShortUrl = new ShortUrl(
        'http://somewhere-else.com',
        'abcd',
      );
      jest.spyOn(service, 'findByKey').mockResolvedValue(mockExistingShortUrl);

      await expect(async () => {
        await controller.create({
          original: 'https://google.de',
          short: 'abcd',
        });
      }).rejects.toThrow(BadRequestException);
    });
  });

  describe('Retrieve Short URL', () => {
    it('calls the service to find the matching entry', async () => {
      const spy = jest.spyOn(service, 'findByKey');
      await controller.get('asdf');
      expect(spy).toHaveBeenCalled();
    });

    it('should fail when not given an existing short code', async () => {
      jest.spyOn(service, 'findByKey').mockResolvedValue(null);

      await expect(async () => {
        await controller.get('not-valid');
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('Reset Cache during runtime', () => {
    it('should call the service to reset the cache', async () => {
      const spy = jest.spyOn(service, 'reset');
      await controller.reset();

      expect(spy).toHaveBeenCalled();
    });
  });
});
