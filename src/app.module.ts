import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { SeriesModule } from './series/series.module';
import { TagsModule } from './tags/tags.module';
import { ChaptersModule } from './chapters/chapters.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    SeriesModule,
    TagsModule,
    ChaptersModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
