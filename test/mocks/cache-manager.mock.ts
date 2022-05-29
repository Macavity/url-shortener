import { CACHE_MANAGER } from '@nestjs/common';

export const CacheManagerMockProvider = {
  provide: CACHE_MANAGER,
  useValue: {
    get: () => Promise.resolve('any value'),
    set: () => jest.fn(),
    reset: () => Promise.resolve(),
  },
};
