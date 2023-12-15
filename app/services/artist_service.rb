class ArtistService
    # A function to list all artists
    def self.listAll
        ArtistRepository.all
    end

    # A function to create an artist
    def self.save(artist_params)
        ArtistRepository.create(artist_params)
    end 

    # A function to find an artist by id
    def self.get(artist_params)
        ArtistRepository.find_by_id(artist_params[:id])
    end

    # A function to update an artist
    def self.update(artist, artist_params)
        ArtistRepository.update_attributes(artist, artist_params)
    end

    # A function to delete an artist
    def self.delete(artist_params)
        ArtistRepository.delete_by_id(artist_params[:id])
    end 

    # A function to log artist in
    def self.login(params, session)
        artist = ArtistRepository.find_by_attribute(:email, params[:email])
        # Authenticating artist password
        if artist&.authenticate(params[:password])
            session[:artist_id] = artist.id
            artist
        else
            {error: "Invalid email or password"}
        end
    end
    # A function to log artist out
    def self.logout(session)
        session.delete :artist_id
    end

    # A function to check if artist is logged in
    def self.logged_in(session)
        admin = ArtistRepository.find_by_id(session[:artist_id])
        puts admin
        admin
    end

    # A function to enable account recovery
    def self.accountRecovery(artist_params)
        artist = ArtistRepository.find_by_attribute("email", artist_params[:email])
        if artist != nil
          artist
        else
          {error: "Email isn't linked to any account!"}
        end
       
    end
end