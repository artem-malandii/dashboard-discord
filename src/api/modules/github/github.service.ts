import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class GithubService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getGithubActivity(
    repositoryName: string,
    page: number,
    pageSize: number,
  ) {
    const offset = (page - 1) * pageSize;

    const commitColumns = await this.getTableColumns('commits');
    const pullRequestColumns = await this.getTableColumns('pull_requests');

    const allColumns = Array.from(
      new Set([...commitColumns, ...pullRequestColumns]),
    );

    const commitSelect = allColumns
      .map((column) =>
        commitColumns.includes(column)
          ? `"commits"."${column}"`
          : `NULL AS "${column}"`,
      )
      .join(', ');

    const pullRequestSelect = allColumns
      .map((column) =>
        pullRequestColumns.includes(column)
          ? `"pull_requests"."${column}"`
          : `NULL AS "${column}"`,
      )
      .join(', ');

    const query = `
      SELECT ${commitSelect}
      FROM "commits" AS commits
      WHERE commits.repository = $1
      
      UNION ALL
      
      SELECT ${pullRequestSelect}
      FROM "pull_requests" AS pull_requests
      WHERE pull_requests.repository = $1
      
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = (
      (await this.dataSource.query(query, [
        repositoryName,
        pageSize,
        offset,
      ])) as any[]
    ).map((item) => ({
      username: item.commit ? item.commit.author.name : item.base.user.login,
      type: item.commit ? 'commit' : 'pull-request',
      sha: item.commit ? item.sha : item.merge_commit_sha,
      message: item.commit ? item.commit.message : item.title,
      date: item.commit ? item.commit.author.date : item.created_at,
      url: item.commit ? item.commit.url : item.url,
    }));

    // Uncomment it to see unmodified full result
    // const result = (await this.dataSource.query(query, [
    //   repositoryName,
    //   pageSize,
    //   offset,
    // ])) as any[];

    return result;
  }

  private async getTableColumns(tableName: string): Promise<string[]> {
    const columns = await this.dataSource.query(
      `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = $1
    `,
      [tableName],
    );

    return columns.map((col: { column_name: string }) => col.column_name);
  }
}
