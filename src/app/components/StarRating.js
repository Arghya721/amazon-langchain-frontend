import React from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Text } from '@nextui-org/react';

export const StarRating = ({ rating, productReviewCount }) => {
    const decimalRating = parseFloat(rating);

    const starStyle = {
        color: '#f5c21b',
        position: 'relative',
    };

    const borderStyle = {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: '1px solid #ffcc00',
        pointerEvents: 'none',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating
                initialRating={decimalRating}
                emptySymbol={<FaRegStar style={starStyle} />}
                fullSymbol={<FaStar style={starStyle} />}
                fractions={10}
                readonly
            >
                <Rating.EmptySymbol style={starStyle}>
                    <div style={borderStyle} />
                </Rating.EmptySymbol>
                <Rating.FullSymbol style={starStyle}>
                    <div style={borderStyle} />
                </Rating.FullSymbol>
            </Rating>
            <Text h5 style={{ marginLeft: 4 }}>{productReviewCount}</Text>
        </div>
    );
};
