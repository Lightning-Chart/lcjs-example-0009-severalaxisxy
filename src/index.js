/*
 * LightningChartJS example for several AxisXY
 */

// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Import xydata
const xydata = require('@arction/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, SolidFill, SolidLine, ColorRGBA, Themes } = lcjs

const { createProgressiveRandomGenerator } = xydata

const ls = lightningChart()

const chart = ls
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Several Axis')

// Cache colors used in the example
const blueFill = new SolidFill({ color: ColorRGBA(0, 0, 255) })
const greenFill = new SolidFill({ color: ColorRGBA(0, 255, 0) })
const redFill = new SolidFill({ color: ColorRGBA(255, 0, 0) })

// Cache StrokeStyles used in the example
const blueLine = new SolidLine({ fillStyle: blueFill })
const greenLine = new SolidLine({ fillStyle: greenFill })
const redLine = new SolidLine({ fillStyle: redFill })

// First Axes (default)
const axisX1 = chart
    .getDefaultAxisX()
    // Set title of Axis
    .setTitle('Axis X1')
    // Set interval of X axis
    .setInterval({ start: -10, end: 1300 })
    .setStrokeStyle(blueLine)

const axisY1 = chart
    .getDefaultAxisY()
    // Set title of Axis
    .setTitle('Axis Y1')
    // Set interval of Y axis
    .setInterval({ start: -150, end: 100 })
    .setStrokeStyle(blueLine)

// Second Axes  (extra)
const axisX2 = chart
    .addAxisX({
        opposite: true,
    })
    .setTitle('Axis X2')
    .setInterval({ start: -60, end: 500 })
    .setStrokeStyle(greenLine)

const axisY2 = chart
    .addAxisY({
        opposite: true,
    })
    .setTitle('Axis Y2')
    .setInterval({ start: -20, end: 200 })
    .setStrokeStyle(greenLine)

// Create series with explicit axes.
// Axes 1
const splineSeries1 = chart
    .addSplineSeries({
        xAxis: axisX1,
        yAxis: axisY1,
    })
    .setStrokeStyle(redLine)
    .setPointFillStyle(blueFill)
    .setName('Axis 1')

// Axes 2
const splineSeries2 = chart
    .addSplineSeries({
        xAxis: axisX2,
        yAxis: axisY2,
    })
    .setStrokeStyle(greenLine)
    .setName('Axis 2')

// Function to add random values to given series with createProgressiveRandomGenerator
const setSeries = (amountOfDots, splineSeries) => {
    createProgressiveRandomGenerator()
        .setNumberOfPoints(amountOfDots)
        .generate()
        // Set stream to output X points at a time
        .setStreamBatchSize(amountOfDots)
        // Create a new stream with previously defined stream settings
        .toStream()
        .forEach((point, i) => {
            ;(point.x = point.x * 5), // define X coordinates for point
                (point.y = 20 * Math.sin(i / (10 * Math.PI)) + Math.floor(Math.random() * 20)) // define Y coordinates for point
            splineSeries.add(point) // add to series
        })
}

// set Series 1
setSeries(250, splineSeries1)

// set Series 2
setSeries(70, splineSeries2)
