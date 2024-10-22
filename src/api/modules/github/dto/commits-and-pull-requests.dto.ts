import { IsOptional, IsString } from 'class-validator';

export class CommitsAndPullRequestsDto {
  @IsOptional()
  @IsString()
  repoName: string;
}
