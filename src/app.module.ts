import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AppController } from './app.controller';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
