class ProjectVideoSerializer < ActiveModel::Serializer
  attributes :id, :video_title, :video_url
  has_one :project
end
