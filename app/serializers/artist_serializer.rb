class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :stage_name, :email, :verified, :password_digest
end
