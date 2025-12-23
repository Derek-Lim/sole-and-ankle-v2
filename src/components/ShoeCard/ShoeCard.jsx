import React from "react";
import styled from "styled-components";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantProps = {
    "on-sale": {
      tagText: "Sale",
      backgroundColor: "#C5295D",
    },
    "new-release": {
      tagText: "Just Released!",
      backgroundColor: "#6868D9",
    },
    default: {
      tagText: null,
      backgroundColor: null,
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price crossedOut={variant === "on-sale"}>{formatPrice(price)}</Price>
          {salePrice === null || (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
        {variant === "default" || (
          <Tag backgroundColor={variantProps[variant].backgroundColor}>
            {variantProps[variant].tagText}
          </Tag>
        )}
      </Wrapper>
    </Link>
  );
};

const Tag = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  border: solid;
  font-weight: 700;
  border-radius: 2px;
  padding: 7px 9px 9px 11px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(props) => {
    if (props.crossedOut) return "line-through";
    return "none";
  }};
  color: ${(props) => {
    if (props.crossedOut) return COLORS.gray[700];
  }};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  right: 0;
  top: 25px;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
