import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { CommitsAndPullRequestsDto } from './dto/commits-and-pull-requests.dto';

@Controller()
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('github-activity')
  getGithubActivity(@Query() queryDto: CommitsAndPullRequestsDto) {
    return this.githubService.getGithubActivity(
      `artem-malandii/${queryDto.repoName}`,
      1,
      10,
    );
  }
}
