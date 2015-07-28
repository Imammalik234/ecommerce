define([
        'jquery',
        'underscore.string',
        'views/course_detail_view',
        'models/course_model'
    ],
    function ($,
              _s,
              CourseDetailView,
              Course) {
        'use strict';

        describe('course detail view', function () {
            var view,
                model,
                data = {
                    id: 'edX/DemoX/Demo_Course',
                    url: 'http://ecommerce.local:8002/api/v2/courses/edX/DemoX/Demo_Course/',
                    name: 'edX Demonstration Course',
                    verification_deadline: null,
                    type: 'verified',
                    products_url: 'http://ecommerce.local:8002/api/v2/courses/edX/DemoX/Demo_Course/products/',
                    last_edited: '2015-07-27T00:27:23Z',
                    products: [
                        {
                            id: 9,
                            url: 'http://ecommerce.local:8002/api/v2/products/9/',
                            structure: 'child',
                            product_class: 'Seat',
                            title: 'Seat in edX Demonstration Course with honor certificate',
                            price: '0.00',
                            expires: null,
                            attribute_values: [
                                {
                                    name: 'certificate_type',
                                    value: 'honor'
                                },
                                {
                                    name: 'course_key',
                                    value: 'edX/DemoX/Demo_Course'
                                },
                                {
                                    name: 'id_verification_required',
                                    value: false
                                }
                            ],
                            is_available_to_buy: true
                        },
                        {
                            id: 8,
                            url: 'http://ecommerce.local:8002/api/v2/products/8/',
                            structure: 'child',
                            product_class: 'Seat',
                            title: 'Seat in edX Demonstration Course with verified certificate (and ID verification)',
                            price: '15.00',
                            expires: null,
                            attribute_values: [
                                {
                                    name: 'certificate_type',
                                    value: 'verified'
                                },
                                {
                                    name: 'course_key',
                                    value: 'edX/DemoX/Demo_Course'
                                },
                                {
                                    name: 'id_verification_required',
                                    value: true
                                }
                            ],
                            is_available_to_buy: true
                        },
                        {
                            id: 7,
                            url: 'http://ecommerce.local:8002/api/v2/products/7/',
                            structure: 'parent',
                            product_class: 'Seat',
                            title: 'Seat in edX Demonstration Course',
                            price: null,
                            expires: null,
                            attribute_values: [
                                {
                                    name: 'course_key',
                                    value: 'edX/DemoX/Demo_Course'
                                }
                            ],
                            is_available_to_buy: false
                        }
                    ]
                };

            beforeEach(function () {
                model = Course.findOrCreate(data, {parse: true});
                view = new CourseDetailView({model: model}).render();
            });

            it('should display course details', function () {
                expect(view.$el.find('.course-name').text()).toEqual(model.get('name'));
                expect(view.$el.find('.course-id').text()).toEqual(model.get('id'));
                expect(view.$el.find('.course-type').text()).toEqual(_s.capitalize(model.get('type')));
                expect(view.$el.find('.course-verification-deadline').length).toEqual(0);
            });

            it('should list the course seats', function () {
                var $seats = view.$el.find('.course-seat'),
                    products = _.filter(data.products, function (product) {
                        return product.product_class === 'Seat' && product.structure === 'child';
                    });

                expect($seats.length).toEqual(products.length);

                // TODO Verify the rendered info matches the data
            });
        });
    }
);
