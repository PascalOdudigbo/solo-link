puts "Started Seeding 🌱🌱🌱"

artist1 = ArtistService.save(first_name: "Pascal", last_name: "Odudigbo", stage_name: "Makk.Black", email: "makkblackbookings@gmail.com", verified: true, password: "1234567890", password_confirmation: "1234567890")
profile1 = ArtistsProfileService.save(artist_id: artist1.id, artist_image: "", bio: "With esoteric pineal pinnacles in sight, anchored manacles gripped tight.")
socials1 = ArtistsSocialService.save(
    artist_id: artist1.id,
    instagram: "https://www.instagram.com/makk.black/",
    tiktok: "",
    twitter: "https://twitter.com/facesofsphinx",
    facebook: "https://www.facebook.com/Facesofsphinx/",
    youtube: "https://www.youtube.com/channel/UCjXukSkry3V4Dd7bvgOZ7xg",
)
puts "Done Seeding!"
