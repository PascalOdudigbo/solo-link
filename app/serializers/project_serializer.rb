class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :project_url, :cover_art, :cover_art_public_id
  has_one :artist
end
