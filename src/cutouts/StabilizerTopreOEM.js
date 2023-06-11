import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Basic MX stabilizer cutout

export class StabilizerTopreOEM extends CutoutGenerator {

    generate(key, generatorOptions) {

        let keySize = key.width

        if (!key.skipOrientationFix && key.height > key.width) {
            keySize = key.height
        }

        let stab_spacing_left = null
        let stab_spacing_right = null

        if (keySize.gte(8)) {
            stab_spacing_left = stab_spacing_right = new Decimal("66.675")
        }
        else if (keySize.gte(7)) {
            stab_spacing_left = stab_spacing_right = new Decimal("57.15")
        }
        else if (keySize.gte(6.25)) {
            stab_spacing_left = stab_spacing_right = new Decimal("50")
        }
        else if (keySize.gte(6)) {
            stab_spacing_left = stab_spacing_right = new Decimal("47.625")
        }
        else {
            return null
        }

        const width = new Decimal("13.462")
        const upperBound = new Decimal("6.8705")
        const lowerBound = new Decimal("-6.8705")

        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))

        let A = [minsHalfWidth.plus(0.508).toNumber(), upperBound.toNumber()]
        let B = [plusHalfWidth.minus(0.508).toNumber(), upperBound.toNumber()]
        let C = [minsHalfWidth.plus(0.508).toNumber(), lowerBound.toNumber()]
        let D = [plusHalfWidth.minus(0.508).toNumber(), lowerBound.toNumber()]

        let E = [minsHalfWidth.toNumber(), upperBound.minus(0.508).toNumber()]
        let F = [plusHalfWidth.toNumber(), upperBound.minus(0.508).toNumber()]
        let G = [minsHalfWidth.toNumber(), lowerBound.plus(0.508).toNumber()]
        let H = [plusHalfWidth.toNumber(), lowerBound.plus(0.508).toNumber()]

        var singleCutout = {
            paths: {
                lineTop: new makerjs.paths.Line(A, B),
                lineBottom: new makerjs.paths.Line(C, D),
                lineLeft: new makerjs.paths.Line(E, G),
                lineRight: new makerjs.paths.Line(F, H),
                chamferTopLeft: new makerjs.paths.Line(E, A),
                chamferTopRight: new makerjs.paths.Line(F, B),
                chamferBottomLeft: new makerjs.paths.Line(G, C),
                chamferBottomRight: new makerjs.paths.Line(H, D)
            }
        }

        var cutoutLeft = singleCutout;
        var cutoutRight = makerjs.model.clone(singleCutout);

        cutoutLeft = makerjs.model.move(cutoutLeft, [stab_spacing_left.times(-1).toNumber(), 0])
        cutoutRight = makerjs.model.move(cutoutRight, [stab_spacing_right.toNumber(), 0])

        let cutouts = {
            models: {
                "left": cutoutLeft,
                "right": cutoutRight
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            cutouts = makerjs.model.rotate(cutouts, -90)
        }

        return cutouts;
    }
}