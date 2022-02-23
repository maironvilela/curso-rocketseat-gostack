
import { container } from 'tsyringe';
import RedisCacheProvider from './Implementations/RedisCacheProvider';
import ICacheProvider from './models/ICacheProvider';

const provider = {
  redis: RedisCacheProvider,
}

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  provider.redis
)
