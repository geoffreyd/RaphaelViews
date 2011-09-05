sc_require('raphael');

Raphael.fn.group = function() {

  var r = this,
  cfg = (arguments[0] instanceof Array) ? {} : arguments[0],
  items = (arguments[0] instanceof Array) ? arguments[0] : arguments[1];

  function Group(cfg, items) {
    var inst,
    set = r.set(items),
    group = r.raphael.vml ?
    document.createElement("group") :
    document.createElementNS("http://www.w3.org/2000/svg", "g");

    r.canvas.appendChild(group);

    function updateScale(transform, scale) {
      var scaleString = 'scale(' + scale + ')';
      if (!transform) {
        return scaleString;
      }
      if (transform.indexOf('scale(') < 0) {
        return transform + ' ' + scaleString;
      }
      return transform.replace(/scale\(-?[0-9]+(\.[0-9][0-9]*)?\)/, scaleString);
    }

    function updateRotation(transform, rotation, x, y) {
      var rotateString = 'rotate(' + rotation + ','+x+','+y+' )';
      if (!transform) {
        return rotateString;
      }
      if (transform.indexOf('rotate(') < 0) {
        return transform + ' ' + rotateString;
      }
      return transform.replace(/rotate\((-?[0-9]+(\.[0-9][0-9]*)?,? ?)*\)/, rotateString);
    }

    inst = {
      scale: function (newScale) {
        var transform = group.getAttribute('transform');
        group.setAttribute('transform', updateScale(transform, newScale));
        return this;
      },
      rotate: function(deg, x, y) {
        var transform = group.getAttribute('transform');
        if (!x) x = 0;
        if (!y) y = 0;
        group.setAttribute('transform', updateRotation(transform, deg, x, y));
      },
      push: function(item) {
        function pushOneRaphaelVector(it) {
          var i;
          if (it.type === 'set') {
            for (i = 0; i < it.length; i++) {
              pushOneRaphaelVector(it[i]);
            }
          } else {
            group.appendChild(it.node);
            set.push(it);
          }
        }

        pushOneRaphaelVector(item);
        return this;
      },
      getBBox: function() {
        return set.getBBox();
      },
      type: 'group',
      node: group
    };

    return inst;
  }

  return Group(cfg, items);

};