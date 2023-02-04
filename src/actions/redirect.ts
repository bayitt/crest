import { Request, Response, NextFunction } from "express";
import { Redirect, RedirectModel, Article, ArticleModel } from "../models";

export const redirect = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { params } = request;

  const handleArticleCheck = (articles: Article[]) => {
    if (articles.length === 0)
      return response
        .status(404)
        .json({ message: "the link you requested for does not exist" });

    const article = articles[0];
    const articleUrl = (process.env.BLOG_URL ?? "") + article.slug;
    response.redirect(articleUrl);
  };

  const handleRedirectCheck = (redirects: Redirect[]) => {
    if (redirects.length === 0)
      return response
        .status(404)
        .json({ message: "the link you requested for does not exist" });

    const redirect = redirects[0];

    ArticleModel.findByUuid(redirect.article_uuid, handleArticleCheck);
  };

  RedirectModel.findByLink(params?.link ?? "", handleRedirectCheck);
};
