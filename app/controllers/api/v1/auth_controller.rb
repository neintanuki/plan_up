require './lib/json_templates/register.rb'
require './lib/json_templates/login.rb'

module Api
  module V1
    class AuthController < ActionController::API

      def login
        @body = JSON.parse(request.raw_post)
        @login = Login.new

        # find user
        @user = User.find_by username: @body["username"]

        # validation
        if @user          
          ency_pass = BCrypt::Password.new(@user[:password_digest])
          
          if ency_pass == @body["password"]
            send_auth_cookie(encode_token(@user.id))
            render json: @login.success    
          else
            # password did not match
            @login.incorrect_password
            render json: @login.fail
          end
        else
          # username not found
          @login.incorrect_username
          render json: @login.fail
        end

      end

      def register
        @register = Register.new
        @body = JSON.parse(request.raw_post)

        # create user
        @user = User.create(
          username: @body["username"],
          password: @body["password"]
        )
        
        # validation
        if @user.save
          send_auth_cookie(encode_token(@user.id))
          render json: @register.success
        else
          render json: @register.fail(@user.errors)
        end

      end

      private
      include Register
      include Login

      def secret_key
        return ENV["API_KEY"]
      end

      def encode_token(user_id)
        payload = { user_id: user_id }
        return JWT.encode(payload, secret_key, algorithm = 'HS256')
      end

      def send_auth_cookie(token, path = "/")
        response.set_cookie(
          :jwt_auth,
          {
            path: path,
            expiry: 60 * 60 * 24 * 1000, # 3 days before expiration
            value: token,
            secure: true,
            httponly: true
          }
        )
      end

    end
  end
end