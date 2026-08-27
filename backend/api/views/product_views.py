from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.models import Product, Review
from api.serializers import ProductSerializer


# =========================================================
# Get all products
# GET /api/products/
# =========================================================
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)


# =========================================================
# Get single product
# GET /api/products/<pk>/
# =========================================================
@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(
            {'detail': 'Product not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(
        product,
        many=False,
        context={'request': request}
    )

    return Response(serializer.data)


# =========================================================
# Get top-rated products
# GET /api/products/top/
# =========================================================
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(
        rating__gte=4
    ).order_by('-rating')[:5]

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)


# =========================================================
# Create product review
# POST /api/products/<pk>/reviews/
# =========================================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):

    # Get logged-in user
    user = request.user

    # Get product
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(
            {'detail': 'Product not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    data = request.data

    # =====================================================
    # Check whether user already reviewed this product
    # =====================================================
    already_exists = product.review_set.filter(
        user=user
    ).exists()

    if already_exists:
        return Response(
            {'detail': 'Product already reviewed'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # =====================================================
    # Get rating
    # =====================================================
    try:
        rating = int(data.get('rating', 0))
    except (TypeError, ValueError):
        rating = 0

    # Validate rating
    if rating < 1 or rating > 5:
        return Response(
            {'detail': 'Please select a rating between 1 and 5'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # =====================================================
    # Get comment
    # =====================================================
    comment = data.get('comment', '').strip()

    # =====================================================
    # Create review
    # =====================================================
    Review.objects.create(
        user=user,
        product=product,
        name=user.first_name or user.username,
        rating=rating,
        comment=comment,
    )

    # =====================================================
    # Recalculate product reviews
    # =====================================================
    reviews = product.review_set.all()

    product.numReviews = reviews.count()

    total_rating = sum(review.rating for review in reviews)

    if product.numReviews > 0:
        product.rating = total_rating / product.numReviews
    else:
        product.rating = 0

    product.save()

    return Response(
        {'detail': 'Review Added'},
        status=status.HTTP_201_CREATED
    )
