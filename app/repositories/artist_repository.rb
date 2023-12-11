class ArtistRepository
    def self.all
        Artist.all
    end 

    def self.create(artist_params)
        Artist.create(artist_params)
    end

    def self.find_by_id(artist_id)
        Artist.find(artist_id)
    end

    def self.find_by_attribute(attribute, value)
        Artist.find_by(attribute => value)
    end

    def self.where(conditions)
        Artist.where(conditions)
    end

    def self.update_attributes(artist, artist_params)
        artist.update(artist_params)
    end

    def self.delete_by_id(artist_id)
        artist = Artist.find(artist_id)
        artist.destroy
    end
 
end