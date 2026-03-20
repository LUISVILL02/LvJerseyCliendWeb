import { JerseyDetail, JerseyDetailResponse } from "../models/Jersey-details"

export const jerseyDeatailsAdapter = (jerseyDeatils: JerseyDetailResponse): JerseyDetail => {
    return {
        id: jerseyDeatils.id,
        name: jerseyDeatils.name,
        price: jerseyDeatils.price,
        rating: jerseyDeatils.rating,
        reviewsCount: jerseyDeatils.reviewsCount,
        category: jerseyDeatils.category,
        brand: jerseyDeatils.brand,
        type: jerseyDeatils.type,
        season: jerseyDeatils.season,
        weightKg: jerseyDeatils.weightKg,
        tag: jerseyDeatils.tag,
        images: jerseyDeatils.images,
        availableSizes: jerseyDeatils.availableSizes.map(size => ({
            code: size.code,
            available: size.available
        })),
        patches: jerseyDeatils.patches.map(patch => ({
            id: patch.id,
            name: patch.name,
            imageUrl: patch.imageUrl,
            price: patch.price
        })),
        stock: jerseyDeatils.stock,
        description: jerseyDeatils.description,
        isFavorite: jerseyDeatils.isFavorite,
        reviews: jerseyDeatils.reviews?.map(review => ({
            id: review.id,
            user: review.user,
            countryFlag: review.countryFlag,
            overallRating: review.overallRating,
            date: review.date,
            ratings:{
                quality: review.ratings.quality,
                delivery: review.ratings.delivery,
                details: review.ratings.details
            },
            comments: {
                quality: review.comments.quality,
                delivery: review.comments.delivery,
                details: review.comments.details
            },
            generalComment: review.generalComment,
            images: review.images
        }))
    }
}