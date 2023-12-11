class ArtistsProfileSerializer < ActiveModel::Serializer
  attributes :id, :artist_image, :image_public_id, :bio
  has_one :artist
end
