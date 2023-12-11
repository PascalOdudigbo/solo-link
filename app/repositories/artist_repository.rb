class ArtistRepository
    # A function to list all artists
    def self.all
        Artist.all
    end
     
    # A function to create an artist
    def self.create(artist_params)
        Artist.create(artist_params)
    end

    # A function to find an artist by id
    def self.find_by_id(artist_id)
        Artist.find(artist_id)
    end

    # A function to find an artist using a specific attribute
    def self.find_by_attribute(attribute, value)
        Artist.find_by(attribute => value)
    end

    # A function to find an artist that satisfies a condition
    def self.where(conditions)
        Artist.where(conditions)
    end

    # A function to update an artist
    def self.update_attributes(artist, artist_params)
        artist.update(artist_params)
    end

    # A function to delete an artist
    def self.delete_by_id(artist_id)
        artist = Artist.find(artist_id)
        artist.destroy
    end
 
end