import { Module } from '@nestjs/common';
import { OctokitModule } from 'nestjs-octokit';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';

@Module({
  imports: [
    OctokitModule.forRoot({
      isGlobal: true,
      octokitOptions: {
        auth: process.env.GITHUB_TOKEN || '',
      },
    }),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GitHubModule {}
