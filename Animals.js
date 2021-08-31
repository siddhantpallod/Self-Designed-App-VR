    AFRAME.registerComponent("tour", {
      schema: {
        state: { type: "string", default: "places-list" },
        selectedCard: { type: "string", default: "#card1" },
        zoomAspectRatio: { type: "number", default: 1 }
      },
      init: function() {
        this.placesContainer = this.el;
        this.cameraEl = document.querySelector("#camera");
        this.createCards();
      },
      update: function() {
        window.addEventListener("keydown", e => {
          if (e.key === "ArrowUp") {
            if (
              (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
              (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio += 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
          if (e.key === "ArrowDown") {
            if (
              (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
              (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio -= 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
        });
      },

      tick: function() {
        const { state } = this.el.getAttribute("tour");
    
        if (state === "view") {
          this.hideEl([this.placesContainer]);
          this.showView();
        }
      },

      hideEl: function(elList) {
        elList.map(el => {
          el.setAttribute("visible", false);
        });
      },

      showView: function() {
        const { selectedCard } = this.data;
        
        const entity = document.querySelector('#entity')
        entity.setAttribute('gltf-model', `./assets/3dmodels/${selectedCard}/scene.gltf`)
        entity.setAttribute('position', {x:0,  y:0,  z:-3})
        entity.setAttribute('visible', true)
        entity.setAttribute('animation-mixer', {})
      },

      createCards: function() {
        
        const thumbNailsRef = [
          {
            id: 'tiger',
            title: 'Tiger',
            url: './assets/images/tiger.png'
          },
          {
            id: 'cheetah',
            title: 'Chettah',
            url: './assets/images/chettah.png'
          }, 
          {
            id: 'elephant',
            title: 'Elephant',
            url: './assets/images/elephant.png'
          }, 
          {
            id: 'fox',
            title: 'Fox',
            url: './assets/images/fox.png'
          }, 
          {
            id: 'giraffe',
            title: 'Giraffe',
            url: './assets/images/giraffe.png'
          }, 
          {
            id: 'hippos',
            title: 'Hippo',
            url: './assets/images/hippos.png'
          }, 
          {
            id: 'panda',
            title: 'Panda',
            url: './assets/images/panda.png'
          }, 
          {
            id: 'rhino',
            title: 'Rhino',
            url: './assets/images/rhino.png'
          }, 
        ];
  

        let prevoiusXPosition = -60;
        for (var item of thumbNailsRef) {
          const posX = prevoiusXPosition + 25;
          const posY = 10;
          const posZ = -40;
          const position = { x: posX, y: posY, z: posZ };
          prevoiusXPosition = posX;
    
          // Border Element
          const borderEl = this.createBorder(position, item.id);
    
          // Thubnail Element
          const thumbNail = this.createThumbNail(item);
          borderEl.appendChild(thumbNail);
    
          // Title Text Element
          const titleEl = this.createTitleEl(position, item);
          borderEl.appendChild(titleEl);
    
          this.placesContainer.appendChild(borderEl);
        }
      },

      createBorder: function(position, id) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
          primitive: "ring",
          radiusInner: 9,
          radiusOuter: 10
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
          color: "#0077CC",
          opacity: 1
        });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
      },

      createThumbNail: function(item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
          primitive: "circle",
          radius: 9
        });
        entityEl.setAttribute("material", { src: item.url });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
      },

      createTitleEl: function(position, item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 60,
          color: "#e65100",
          value: item.title
        });
        const elPosition = position;
        elPosition.y = -20;
        entityEl.setAttribute("position", elPosition);
        entityEl.setAttribute("visible", true);
        return entityEl;
      },

});