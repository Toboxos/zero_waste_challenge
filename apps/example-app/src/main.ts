import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(
        new ValidationPipe({
            transformOptions: { enableImplicitConversion: true },
            whitelist: true,
        })
    );
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Example')
        .setDescription('Baseline for web projects')
        .setVersion(process.env.npm_package_version)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const swaggerprefix = 'swagger';
    SwaggerModule.setup(swaggerprefix, app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
        'APP'
    );

    Logger.log(
        `💻 Swagger available: http://localhost:${port}/${swaggerprefix}`,
        'APP'
    );
}

bootstrap();
