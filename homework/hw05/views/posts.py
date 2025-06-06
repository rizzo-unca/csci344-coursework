import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        
        try:
            count = int(request.args.get("limit", 20))
            if count > 50:
                count = 50
        except:
            count = 20

        
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(count)

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # TODO: handle POST logic
        return Response(json.dumps({}), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        # TODO: Add PATCH logic...
        return Response(json.dumps({}), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)

        # TODO: Add DELETE logic...
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)
        # TODO: Add GET logic...
        can_view = can_view_post(id, self.current_user)
        if (can_view):
            post = Post.query.get(id)
            return Response(
                json.dumps({post.to_dict(user=self.current_user)}),
                mimetype="application/json",
                status=404,
            )
        else:
            return Response(
                json.dumps({"Message": f"Post id={id} not found"}),
                mimetype="application/json",
                status=200,
            )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
