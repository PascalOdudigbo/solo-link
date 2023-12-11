class ArtistsSocialSerializer < ActiveModel::Serializer
  attributes :id, :instagram, :tiktok, :twitter, :facebook, :youtube
  has_one :artist
end
