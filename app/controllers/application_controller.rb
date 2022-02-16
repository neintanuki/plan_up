class ApplicationController < ActionController::API
	before_action :user_status

  def initialize
    @id = nil
  end


	private

	def decode_token
		token = request.cookies["jwt_auth"]

    if token
      JWT.decode(token, ENV['API_SALT'])
    else
      nil
    end

	end

  def user_status
    @id = decode_token.first["user_id"]

    unless @id
      render json: {
        status: {
          code: 401,
          message: "Unauthorized"
        },
        message: "User not logged in" 
      }, status: :unauthorized
    end
  end
  
end
