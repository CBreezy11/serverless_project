import requests
import json

apiKey = ''


def makeBusinessList(business_object):
    businessObject = {
        'id': business_object['id'],
        'imageSrc': business_object['image_url'],
        'name': business_object['name'],
        'address': business_object['location']['address1'],
        'city': business_object['location']['city'],
        'state': business_object['location']['state'],
        'zipcode': business_object['location']['zip_code'],
        'category': business_object['categories'][0]['title'],
        'rating': business_object['rating'],
        'reviewCount': business_object['review_count']
    }
    return businessObject


def lambda_handler(event, context):
    info = event
    term = info['term']
    location = info['location']
    sortBy = info['sortBy']
    response = requests.get(
        f"http://api.yelp.com/v3/businesses/search?term={term}&location={location}&sort_by={sortBy}",
        headers={'Authorization': f'Bearer {apiKey}'}
    )
    return list(map(makeBusinessList, response.json()['businesses']))
