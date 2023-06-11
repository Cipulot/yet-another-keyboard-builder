import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Topre 1U switch cutout
// Simple filleted rectangle of 14.6 x 14mm size

export class SwitchTopreOEM extends CutoutGenerator {

    generate(key, generatorOptions) {
        let width
        let height
        let A
        let B
        let C
        let D
        let E
        let F
        let G
        let H
        let I
        let J
        let K
        let L
        var model

        if (((key.width >= 2) && (key.width <= 3)) || ((key.height >= 2) && (key.height <= 3))) {
            width = new Decimal("32")
            height = new Decimal("14")

            const plusHalfWidth = width.dividedBy(new Decimal("2"))
            const minsHalfWidth = width.dividedBy(new Decimal("-2"))
            const plusHalfHeight = height.dividedBy(new Decimal("2"))
            const minsHalfHeight = height.dividedBy(new Decimal("-2"))

            A = [minsHalfWidth.toNumber(), plusHalfHeight.toNumber()]
            B = [plusHalfWidth.toNumber(), plusHalfHeight.toNumber()]
            C = [minsHalfWidth.toNumber(), minsHalfHeight.plus(1.732).toNumber()]
            D = [plusHalfWidth.toNumber(), minsHalfHeight.plus(1.732).toNumber()]
            E = [minsHalfWidth.plus(3).toNumber(), minsHalfHeight.toNumber()]
            F = [plusHalfWidth.minus(3).toNumber(), minsHalfHeight.toNumber()]

            K = [plusHalfWidth.plus(0.1512).toNumber(), minsHalfHeight.minus(0.1469).toNumber()]
            L = [minsHalfWidth.minus(0.1512).toNumber(), minsHalfHeight.minus(0.1469).toNumber()]

            model = {
                paths: {
                    lineTop: new makerjs.paths.Line(A, B),
                    lineBottom: new makerjs.paths.Line(E, F),
                    lineLeft: new makerjs.paths.Line(A, C),
                    lineRight: new makerjs.paths.Line(B, D),
                    chamferBottomLeft: new makerjs.paths.Line(C, E),
                    chamferBottomRight: new makerjs.paths.Line(D, F),
                    screwHoleLeft: new makerjs.paths.Circle(K, 1),
                    screwHoleRight: new makerjs.paths.Circle(L, 1)
                }
            }
        }
        else {
            width = new Decimal("14.6")
            height = new Decimal("14")

            const plusHalfWidth = width.dividedBy(new Decimal("2"))
            const minsHalfWidth = width.dividedBy(new Decimal("-2"))
            const plusHalfHeight = height.dividedBy(new Decimal("2"))
            const minsHalfHeight = height.dividedBy(new Decimal("-2"))

            A = [minsHalfWidth.plus(1.301).toNumber(), plusHalfHeight.toNumber()]
            B = [plusHalfWidth.minus(1.301).toNumber(), plusHalfHeight.toNumber()]
            E = [minsHalfWidth.plus(1.301).toNumber(), minsHalfHeight.toNumber()]
            F = [plusHalfWidth.minus(1.301).toNumber(), minsHalfHeight.toNumber()]

            G = [minsHalfWidth.toNumber(), plusHalfHeight.minus(1.301).toNumber()]
            H = [plusHalfWidth.toNumber(), plusHalfHeight.minus(1.301).toNumber()]
            I = [minsHalfWidth.toNumber(), minsHalfHeight.plus(1.301).toNumber()]
            J = [plusHalfWidth.toNumber(), minsHalfHeight.plus(1.301).toNumber()]

            model = {
                paths: {
                    lineTop: new makerjs.paths.Line(A, B),
                    lineBottom: new makerjs.paths.Line(E, F),
                    lineLeft: new makerjs.paths.Line(G, I),
                    lineRight: new makerjs.paths.Line(H, J),
                    chamferTopLeft: new makerjs.paths.Line(G, A),
                    chamferTopRight: new makerjs.paths.Line(H, B),
                    chamferBottomLeft: new makerjs.paths.Line(I, E),
                    chamferBottomRight: new makerjs.paths.Line(J, F)
                }
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            model = makerjs.model.rotate(model, 90)
        }

        return model;
    }
}