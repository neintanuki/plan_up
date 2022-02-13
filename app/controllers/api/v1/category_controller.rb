require './lib/json_templates/category_create.rb'

module Api
  module V1
    class CategoryController < ApplicationController

      def create
        # @id
        @body = JSON.parse(request.raw_post)
        @create = CategoryCreate.new

        if @body["project_id"]

          @project = Project.find_by(
            id: @body["project_id"],
            user_id: @id
          )

          @category = @project.categories.create(
            title: @body["title"]
          )

          if @category.save
            render json: @create.success
          else
            @create.errors = @category.errors

            render json: @create.fail, status: :bad_request
          end

        else
          @create.errors = {
            project_id: ["is empty"]
          }

          render json: @create.fail, status: :bad_request
        end

      end

      private
      include CategoryCreate



    end
  end
end