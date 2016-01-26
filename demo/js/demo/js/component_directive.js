(function()
{
    'use strict';

    angular
        .module('Directives')
        .directive('lxComponent', lxComponent)
        .directive('lxComponentAttributes', lxComponentAttributes)
        .directive('lxComponentMethods', lxComponentMethods)
        .directive('lxComponentMethod', lxComponentMethod);

    function lxComponent()
    {
        return {
            restrict: 'E',
            templateUrl: '/js/demo/views/component.html',
            scope: true,
            link: link,
            controller: LxComponentController,
            controllerAs: 'lxComponent',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            attrs.$observe('lxJsPath', function(newJsPath)
            {
                scope.lxComponent.jsPath = newJsPath;
            });

            attrs.$observe('lxPath', function(newPath)
            {
                scope.lxComponent.path = newPath;
            });

            attrs.$observe('lxTitle', function(newTitle)
            {
                scope.lxComponent.title = newTitle;
            });
        }
    }

    LxComponentController.$inject = ['$transclude'];

    function LxComponentController($transclude)
    {
        var lxComponent = this;

        lxComponent.toggle = toggle;

        lxComponent.isOpen = false;

        $transclude(function(clone)
        {
            if (clone.length)
            {
                lxComponent.hasTranscluded = true;
            }
        });

        ////////////

        function toggle()
        {
            lxComponent.isOpen = !lxComponent.isOpen;
        }
    }

    function lxComponentAttributes()
    {
        return {
            restrict: 'E',
            templateUrl: '/js/demo/views/component-attributes.html',
            transclude: true
        };
    }

    function lxComponentMethods()
    {
        return {
            restrict: 'E',
            templateUrl: '/js/demo/views/component-methods.html',
            scope: true,
            link: link,
            controller: LxComponentMethodsController,
            controllerAs: 'lxComponentMethods',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            attrs.$observe('lxTitle', function(newTitle)
            {
                scope.lxComponentMethods.title = newTitle;
            });
        }
    }

    function LxComponentMethodsController()
    {
        var lxComponentMethods = this;
    }

    function lxComponentMethod()
    {
        return {
            restrict: 'E',
            templateUrl: '/js/demo/views/component-method.html',
            scope: true,
            link: link,
            controller: LxComponentMethodController,
            controllerAs: 'lxComponentMethod',
            bindToController: true,
            transclude: true
        };

        function link(scope, element, attrs)
        {
            attrs.$observe('lxName', function(newName)
            {
                scope.lxComponentMethod.name = newName;
            });

            attrs.$observe('lxDescription', function(newDescription)
            {
                scope.lxComponentMethod.description = newDescription;
            });
        }
    }

    function LxComponentMethodController()
    {
        var lxComponentMethod = this;
    }
})();