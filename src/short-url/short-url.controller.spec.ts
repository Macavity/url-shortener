import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheManagerMockProvider } from '../../test/mocks/cache-manager.mock';
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
    it('saves the url, if provided a valid DTO', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await controller.create({ original: 'https://google.de' });

      expect(createSpy).toHaveBeenCalled();
    });

    it('fails when provided with an invalid URL', async () => {
      jest.spyOn(service, 'create');

      expect(() => {
        controller.create({ original: 'Horst Müller' });
      }).toThrow(UnprocessableEntityException);
    });
  });
});
