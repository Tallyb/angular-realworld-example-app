import { MockBuilder, ngMocks } from 'ng-mocks';
import { describe, beforeEach, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { ArticlesService } from './articles.service';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Article, ArticleListConfig } from '../models';
import { TestBed } from '@angular/core/testing';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let apiService: ApiService;

  ngMocks.faster();

  beforeAll(async () => MockBuilder(ArticlesService)
      .mock(ApiService)
  );

  beforeEach(() => {
    service = TestBed.inject(ArticlesService);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(vi.resetAllMocks);

  describe('query', () => {
    it('should query articles with correct params', () => {
      const config: ArticleListConfig = {
        type: 'all',
        filters: {
          tag: 'test',
          author: 'author',
          limit: 10,
        },
      };

      const mockResponse = {
        articles: [{ slug: 'test-article' }],
        articlesCount: 1,
      };

      apiService.get = vi.fn().mockReturnValue(of(mockResponse));
      console.log(process.env.TZ);
      service.query(config).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(apiService.get).toHaveBeenCalledWith(
          '/articles',
          new HttpParams({ fromObject: config.filters })
        );
      });
    });

    it('should query feed articles when type is feed', () => {
      const config: ArticleListConfig = {
        type: 'feed',
        filters: {},
      };

      const mockResponse = {
        articles: [],
        articlesCount: 0,
      };

      apiService.get = vi.fn().mockReturnValue(of(mockResponse));

      service.query(config).subscribe(() => {
        expect(apiService.get).toHaveBeenCalledWith(
          '/articles/feed',
          new HttpParams({ fromObject: {} })
        );
      });
    });
  });

  describe('get', () => {
    it('should get article by slug', () => {
      const slug = 'test-article';
      const mockArticle: Article = {
        slug,
        title: 'Test Article',
        description: 'Test Description',
        body: 'Test Body',
        tagList: ['test'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'testuser',
          bio: null,
          image: 'test.jpg',
          following: false,
        },
      };

      apiService.get = vi.fn().mockReturnValue(of({article: mockArticle}));

      service.get(slug).subscribe((article) => {
        expect(article).toEqual(mockArticle);
        expect(apiService.get).toHaveBeenCalledWith('/articles/' + slug);
      });
    });
  });

  describe('destroy', () => {
    it('should delete article', () => {
      const slug = 'test-article';
      apiService.delete = vi.fn().mockReturnValue(of({}));

      service.destroy(slug).subscribe(() => {
        expect(apiService.delete).toHaveBeenCalledWith('/articles/' + slug);
      });
    });
  });

  describe('save', () => {
    it('should create new article', () => {
      const article = {
        title: 'Test Article',
        description: 'Test Description',
        body: 'Test Body',
        tagList: ['test'],
      };

      const mockResponse = {
        article: { ...article, slug: 'test-article' },
      };

      apiService.post = vi.fn().mockReturnValue(of(mockResponse));

      service.save(article).subscribe((response) => {
        expect(response).toEqual(mockResponse.article);
        expect(apiService.post).toHaveBeenCalledWith('/articles/', { article });
      });
    });

    it('should update existing article', () => {
      const article = {
        slug: 'test-article',
        title: 'Updated Article',
        description: 'Updated Description',
        body: 'Updated Body',
        tagList: ['test'],
      };

      const mockResponse = {
        article: { ...article },
      };

      apiService.put = vi.fn().mockReturnValue(of(mockResponse));

      service.save(article).subscribe((response) => {
        expect(response).toEqual(mockResponse.article);
        expect(apiService.put).toHaveBeenCalledWith('/articles/' + article.slug, { article });
      });
    });
  });

  describe('favorite', () => {
    it('should favorite article', () => {
      const slug = 'test-article';
      apiService.post = vi.fn().mockReturnValue(of({}));

      service.favorite(slug).subscribe(() => {
        expect(apiService.post).toHaveBeenCalledWith('/articles/' + slug + '/favorite');
      });
    });
  });

  describe('unfavorite', () => {
    it('should unfavorite article', () => {
      const slug = 'test-article';
      vi.spyOn(apiService, 'delete').mockReturnValue(of({}));

      service.unfavorite(slug).subscribe(() => {
        expect(apiService.delete).toHaveBeenCalledWith('/articles/' + slug + '/favorite');
      });
    });
  });
});
