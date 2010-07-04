// ==========================================================================
// Project:   RaphaelDemo - mainPage
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo RaphaelViews */

// This page describes the main user interface for your application.  
RaphaelDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'drawingView addPairButton timingView'.w(),
    
    drawingView: RaphaelViews.RaphaelCanvasView.design({
      layout: { centerX: 0, centerY: 0, width: 200, height: 200 },
      
      childViews: 'rectView'.w(),
      
      rectView: RaphaelDemo.RectView.design({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        fill: '#aa0000',
        stroke: '#aa0000',
        
        childViews: 'scatterView'.w(),
        
        scatterView: RaphaelViews.RaphaelCollectionView.design({
          exampleView: RaphaelDemo.DataPointView,
          contentBinding: 'RaphaelDemo.pairsController',
          useFastPath: YES
        })
      })
    }),

    addPairButton: SC.ButtonView.design({
      layout: { centerX: 0, centerY: -150, width: 150, height: 24 },
      title: "Add 20 Points",
      target: RaphaelDemo.pairsController,
      action: 'add20Pairs'
    }),
    
    timingView: SC.LabelView.design({
      layout: { centerX: 200, centerY: 0, width: 100, height: 18 },
      totalTimeBinding: 'RaphaelDemo.pairsController.totalTime',
      
      value: function () {
        var totalTime = this.get('totalTime');
        return (totalTime / 20) + ' ms';
      }.property('totalTime').cacheable()
    })
  })
});
