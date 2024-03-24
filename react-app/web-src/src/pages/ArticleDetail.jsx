import React from "react";
import { useParams } from "react-router-dom";
import ContentFragment from "../components/base/ContentFragment";
import Title from "../components/base/Title";
import Image from "../components/base/Image";
import Text from "../components/base/Text";
import CallToActionCard from "../components/CallToActionSection";
import ArticlesSection from "../components/ArticlesSection";
import { useArticleBySlug } from "../api";
import "./ArticleDetail.scss";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data } = useArticleBySlug(slug);

  if (!data) return;

  const image = data?.image?._dynamicUrl;
  const title = data?.title;
  const content = data?.content;

  return (
    <>
      <ContentFragment cf={data}>
        <div className="container article-wrapper">
          <Title heading="h2" prop="title" className="color-dark">
            {title}
          </Title>
          <Image
            src={image}
            alt={`${title} illustration`}
            prop="Image"
            className="hover-effect main-image"
          />
          <hr />
          <Text content={content} prop="content" className="content" />
          <hr />
        </div>
        <ArticlesSection
          title="Related Articles"
          cfs={data.relatedArticles}
          containerProps={{
            prop: "relatedArticles",
            label: "Related Articles",
            filter: "related-articles",
          }}
          columns={3}
        />
      </ContentFragment>
      <CallToActionCard />
    </>
  );
};

export default ArticleDetail;
