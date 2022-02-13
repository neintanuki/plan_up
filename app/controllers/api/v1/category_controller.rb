module Api
  module V1
    class CategoryController < ApplicationController

      def create
        # @id
        @body = JSON.parse(request.raw_post)

        @project = Project.find_by(
          id: @body["project_id"],
          user_id: @id 
        )

        @category = @project.categories.create(
          title: @body["title"]
        )

        if @category.save
          puts "saved"
        else
          puts "not saved"
        end

        # project id, title,  user_id
      end


    end
  end
end