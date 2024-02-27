import React from "react";
import { useParams } from "react-router-dom";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import Image from "../components/base/Image";
import Text from "../components/base/Text";
import CallToActionCard from "../components/CallToActionSection";
import Loading from "../components/Loading";
import ArticlesSection from "../components/ArticlesSection";
import { useArticleBySlug } from "../api/usePersistedQueries";
import "./ArticleDetail.scss";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { page } = useArticleBySlug(slug);

  if (!page) return <Loading />;

  const image = page?.image?._dynamicUrl;
  const title = page?.title;
  const content = page?.content;

  return (
    <>
      <div className="container">
        <ContentFragment cf={page} className="article-wrapper">
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          <Image
            src={image}
            alt={`${title} illustration`}
            prop="Image"
            className="main-image"
          />
          <hr />
          <Text content={content} prop="content" className="content" />
          <hr />
        </ContentFragment>
      </div>
      <ArticlesSection title="Related Articles" cfs={page.relatedArticles} />
      <CallToActionCard />
    </>
  );
};

export default ArticleDetail;
