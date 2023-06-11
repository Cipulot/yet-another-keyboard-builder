import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Basic MX stabilizer cutout

export class StabilizerTopreRGB extends CutoutGenerator {

    generate(key, generatorOptions) {

        let keySize = key.width

        if (!key.skipOrientationFix && key.height > key.width) {
            keySize = key.height
        }

        let stab_spacing_left = null
        let stab_spacing_right = null

        if (keySize.gte(8)) {
            stab_spacing_left = stab_spacing_right = new Decimal("68.8022")
        }
        else if (keySize.gte(7)) {
            stab_spacing_left = stab_spacing_right = new Decimal("59.2772")
        }
        else if (keySize.gte(6.25)) {
            stab_spacing_left = stab_spacing_right = new Decimal("52.1335")
        }
        else if (keySize.gte(6)) {
            if (key.shift6UStabilizers) {
                stab_spacing_left = new Decimal("59.2772")
                stab_spacing_right = new Decimal("40.2272")
            } else {
                stab_spacing_left = stab_spacing_right = new Decimal("49.7522")
            }
        }
        else if (keySize.gte(3)) {
            stab_spacing_left = stab_spacing_right = new Decimal("21.1772")
        }
        else if (keySize.gte(2)) {
            stab_spacing_left = stab_spacing_right = new Decimal("14.0589")
        }
        else {
            return null
        }

        const width = new Decimal("5.461")
        const upperBound = new Decimal("8.1852")
        const lowerBound = new Decimal("-5.1498")

        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))

        let A = [minsHalfWidth.toNumber(), upperBound.toNumber()]
        let B = [plusHalfWidth.toNumber(), upperBound.toNumber()]
        let C = [minsHalfWidth.toNumber(), lowerBound.toNumber()]
        let D = [plusHalfWidth.toNumber(), lowerBound.toNumber()]
        let E = [plusHalfWidth.toNumber(), upperBound.minus(5.5880).toNumber()]
        let F = [plusHalfWidth.plus(0.6350).toNumber(), upperBound.minus(5.5880).toNumber()]
        let G = [plusHalfWidth.toNumber(), lowerBound.plus(2.0320).toNumber()]
        let H = [plusHalfWidth.plus(0.6350).toNumber(), lowerBound.plus(2.0320).toNumber()]

        var singleCutout = {
            paths: {
                lineTop: new makerjs.paths.Line(A, B),
                lineBottom: new makerjs.paths.Line(C, D),
                lineLeft: new makerjs.paths.Line(A, C),
                lineTopRight: new makerjs.paths.Line(B, E),
                lineBottomRight: new makerjs.paths.Line(D, G),
                tabTop: new makerjs.paths.Line(E, F),
                tabBottom: new makerjs.paths.Line(G, H),
                tabRight: new makerjs.paths.Line(F, H)
            }
        }


        var cutoutLeft = singleCutout;
        var cutoutRight = makerjs.model.clone(singleCutout);

        cutoutRight = makerjs.model.mirror(cutoutRight, true, false)

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