class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :stage_name, :email, :verified, :password_digest
  has_one :artists_profile
  has_one :artists_social
  has_many :projects do
    object.projects.order(created_at: :desc)
  end 
  has_many :project_videos, through: :projects
end
