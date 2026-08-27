from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from api.models import Product
from api.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)


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


# Top Products
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


# Get single products
@api_view(['GET'])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)

    serializer = ProductSerializer(
        product,
        many=False,
        context={"request": request}
    )

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0
    rating = int(data.get('rating', 0))
    if rating == 0:
        return Response(
            {
                'detail': 'Please select a rating'
            },
        status=status.HTTP_400_BAD_REQUEST
    )

    # 3 Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=rating,
            comment=data.get('comment', ''),
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Review Added')
