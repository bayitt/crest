import { Request, Response, NextFunction } from "express";
import { Redirect, RedirectModel, Article, ArticleModel } from "../models";

export const redirect = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { params } = request;
  const blogUrl = process.env.BLOG_URL ?? "";

  if (!params?.link) return response.redirect(302, blogUrl);

  const handleArticleCheck = (articles: Article[]) => {
    if (articles.length === 0 || !articles[0].status)
      return response.status(404).json({
        message: "the link you requested for does not exist",
        statusCode: 404,
      });

    const article = articles[0];
    const articleUrl = blogUrl + article.slug;
    response.redirect(302, articleUrl);
  };

  const handleRedirectCheck = (redirects: Redirect[]) => {
    if (redirects.length === 0)
      return response.status(404).json({
        message: "the link you requested for does not exist",
        statusCode: 404,
      });

    const redirect = redirects[0];

    ArticleModel.findByUuid(redirect.article_uuid, handleArticleCheck);
  };

  RedirectModel.findByLink(params?.link, handleRedirectCheck);
};
