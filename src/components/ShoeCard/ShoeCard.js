import React from "react";
import styled from "styled-components/macro";

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

	const variantTitle = {
		"on-sale": "Sale",
		"new-release": "Just Released!",
	};

	const variantColors = {
		"on-sale": COLORS.primary,
		"new-release": COLORS.secondary,
	};

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				<ImageWrapper>
					<Image alt="" src={imageSrc} />
				</ImageWrapper>
				{variant in variantTitle && (
					<Variant style={{ "--background-color": variantColors[variant] }}>
						{variantTitle[variant]}
					</Variant>
				)}
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price>{formatPrice(price)}</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
				</Row>
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
	text-decoration: none;
	color: inherit;
	flex: 1 1 300px;
`;

const Wrapper = styled.article`
	position: relative;
`;

const ImageWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	border-radius: 16px 16px 4px 4px;
	overflow: hidden;
	width: 100%;
`;

const Row = styled.div`
	font-size: 1rem;
	display: flex;
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
`;

const Price = styled.span`
	margin-inline-start: auto;
`;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

const Variant = styled.div`
	position: absolute;
	top: 12px;
	right: -3px;
	background-color: purple;
	font-size: 14px;
	font-weight: ${WEIGHTS.medium};
	line-height: 16px;
	color: white;
	padding: 7px 9px 9px 10px;
	border-radius: 4px;
	background-color: var(--background-color);
`;

export default ShoeCard;
