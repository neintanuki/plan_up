require './lib/json_templates/register.rb'

module Api
  module V1
    class AuthController < ActionController::API

      def login
        puts "I'm Loading...."
      end

      def register
        @register = Register.new
        @body = JSON.parse(request.raw_post)

        # create user
        @user = User.create(
          username: @body[:username],
          password_digest: @body[:password]
        )
        
        # validation
        if @user.save 
          # send_auth_cookie(encode_token(@user.id))
        else
        
        end

      end

      private
      include Register

      def secret_key
        return ENV["API_KEY"]
      end

      def encode_token(user_id)
        payload = { user_id: user_id }
        return JWT.encode(payload, secret_key, algorithm = 'HS256')
      end

      def send_auth_cookie(token, path)
        if path
          path = '/'
        end

        # response.set_cookie(
        #   :jwt_auth,
        #   {
        #     path: path,
        #     expiry: 60 * 60 * 24 * 1000, # 3 days before expiration
        #     value: token,
        #     secure: true,
        #     httponly: true
        #   }
        # )
        # set token
        # set expiry
      end

    end
  end
end