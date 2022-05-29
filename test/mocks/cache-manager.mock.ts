import { CACHE_MANAGER } from '@nestjs/common';

export const CacheManagerMockProvider = {
  provide: CACHE_MANAGER,
  useValue: {
    get: () => 'any value',
    set: () => jest.fn(),
  },
};
