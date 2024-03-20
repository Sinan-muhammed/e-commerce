const Review = require('../models/reviewModel')

module.exports = {
    addreview : async(req,res)=>{
        try {
            const userId = req.session.userId
            const productId = req.body.productId
            const comment = req.body.reviewText
            const rawStarRating = req.body.starRating
            const rating = parseInt(rawStarRating)
            const orderId = req.body.orderId

            const review = new Review({
                productId,
                userId,
                rating,
                comment
            })
            console.log(review);
            await review.save()

            res.redirect(`/orderdetails?id=${orderId}`)
        } catch (error) {
            console.log(error);
        }
    },
    voting : async (req,res)=>{
        try {
            console.log(req.session.userId);
            if(!req.session.userId){
                return res.json({ success: false, error: 'Unauthorized. User not logged in.'})
            }

            const {type,reviewId,productId} = req.body

            const uservote = {userId:req.session.userId,type}

            const updatedReview = await Review.findOneAndUpdate(
                {_id:reviewId},
                {$push:{votes:uservote}},
                {new:true}
            )
            console.log(updatedReview,'updated review');

            if(!updatedReview){
                return res.status(404).json({ success: false, error: 'Review not found or user not authorized.' });
            }

            res.json({success:true,updatedReview})
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
}
