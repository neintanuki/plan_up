module Api
  module V1
    class ProjectController < ActionController::API

      def create

        # puts JWT.decode(request.cookies['jwt_auth'], secret_key)
        puts secret_key
        puts JWT.encode({ test: 'test' }, algorithm = 'HS256')
        puts request.cookies['jwt_auth']
      end

      private

      def secret_key
        return ENV['API_SALT']
      end

    end
  end
end