import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PromotionsModule } from './promotions/promotions.module';
import { AddresesModule } from './addreses/addreses.module';
import { AuthorizationMiddleware } from './authorization.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'chinese-palace-app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    PromotionsModule,
    AddresesModule,
  ],
  controllers: [],
  providers: [AuthorizationMiddleware],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
    .forRoutes('addreses/*')
  }

}
